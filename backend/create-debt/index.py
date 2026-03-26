import json
import os
import psycopg2

SCHEMA = "t_p99539917_neptune_data_integra"


def handler(event: dict, context) -> dict:
    """Создаёт новый долг между двумя пользователями.
    Body (JSON): creditor_user_id, debtor_user_id, amount, interest_rate?, due_date?, description?
    """
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-User-Id",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Invalid JSON body"}),
        }

    creditor_user_id = body.get("creditor_user_id")
    debtor_user_id = body.get("debtor_user_id")
    amount = body.get("amount")

    if not creditor_user_id or not debtor_user_id or amount is None:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "creditor_user_id, debtor_user_id and amount are required"}),
        }

    if creditor_user_id == debtor_user_id:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "creditor and debtor must be different users"}),
        }

    try:
        amount = float(amount)
        if amount <= 0:
            raise ValueError
    except (ValueError, TypeError):
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "amount must be a positive number"}),
        }

    interest_rate = body.get("interest_rate")
    due_date = body.get("due_date")
    description = body.get("description")

    interest_val = f"{float(interest_rate)}" if interest_rate is not None else "NULL"
    due_val = f"'{due_date}'" if due_date else "NULL"
    desc_val = f"'{str(description).replace(chr(39), chr(39)*2)}'" if description else "NULL"

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(f"""
        INSERT INTO {SCHEMA}.debts
            (creditor_user_id, debtor_user_id, amount, interest_rate, due_date, description, status)
        VALUES
            ({int(creditor_user_id)}, {int(debtor_user_id)}, {amount}, {interest_val}, {due_val}, {desc_val}, 'pending')
        RETURNING id, creditor_user_id, debtor_user_id, amount, interest_rate,
                  description, status, creditor_confirmed, debtor_confirmed,
                  due_date::text, created_at::text, updated_at::text
    """)
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    keys = [
        "id", "creditor_user_id", "debtor_user_id", "amount", "interest_rate",
        "description", "status", "creditor_confirmed", "debtor_confirmed",
        "due_date", "created_at", "updated_at",
    ]
    debt = dict(zip(keys, row))
    debt["amount"] = float(debt["amount"]) if debt["amount"] is not None else None
    debt["interest_rate"] = float(debt["interest_rate"]) if debt["interest_rate"] is not None else None

    return {
        "statusCode": 201,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"debt": debt}),
    }
