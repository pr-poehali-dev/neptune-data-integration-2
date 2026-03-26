import json
import os
import psycopg2

SCHEMA = "t_p99539917_neptune_data_integra"


def handler(event: dict, context) -> dict:
    """Возвращает список долгов пользователя (где он кредитор или должник).
    Query param: user_id (обязательный)
    Query param: role — 'creditor' | 'debtor' | 'all' (по умолчанию 'all')
    """
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-User-Id",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    params = event.get("queryStringParameters") or {}
    user_id = params.get("user_id")
    role = params.get("role", "all")

    if not user_id:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "user_id is required"}),
        }

    try:
        user_id = int(user_id)
    except ValueError:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "user_id must be an integer"}),
        }

    if role == "creditor":
        where = f"creditor_user_id = {user_id}"
    elif role == "debtor":
        where = f"debtor_user_id = {user_id}"
    else:
        where = f"creditor_user_id = {user_id} OR debtor_user_id = {user_id}"

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(f"""
        SELECT id, creditor_user_id, debtor_user_id, amount, interest_rate,
               description, status, creditor_confirmed, debtor_confirmed,
               due_date::text, created_at::text, updated_at::text
        FROM {SCHEMA}.debts
        WHERE {where}
        ORDER BY created_at DESC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    keys = [
        "id", "creditor_user_id", "debtor_user_id", "amount", "interest_rate",
        "description", "status", "creditor_confirmed", "debtor_confirmed",
        "due_date", "created_at", "updated_at",
    ]
    debts = [dict(zip(keys, row)) for row in rows]
    for d in debts:
        d["amount"] = float(d["amount"]) if d["amount"] is not None else None
        d["interest_rate"] = float(d["interest_rate"]) if d["interest_rate"] is not None else None

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"debts": debts, "total": len(debts)}),
    }
