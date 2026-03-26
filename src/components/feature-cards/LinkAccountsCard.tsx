import { HandCoins, ArrowUpRight, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const debts = [
  { name: "Алексей Петров", info: "Долг погашен 15 марта", status: "Погашен", color: "bg-green-700", image: "/professional-man-portrait.png" },
  { name: "Мария Иванова", info: "Срок: 1 апреля 2026", status: "Активен", color: "bg-yellow-600", image: "/professional-woman-portrait.png" },
  { name: "Елена Смирнова", info: "Ожидает подтверждения", status: "Ожидает", initials: "ЕС", color: "bg-teal-600" },
  { name: "Дмитрий Козлов", info: "Просрочен на 3 дня", status: "Просрочен", initials: "ДК", color: "bg-red-700" },
]

const statusColors: Record<string, string> = {
  "Погашен": "text-green-400",
  "Активен": "text-yellow-400",
  "Ожидает": "text-blue-400",
  "Просрочен": "text-red-400",
}

export function LinkAccountsCard() {
  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a]">
        <HandCoins className="h-5 w-5 text-yellow-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Все долги в одном месте</h3>
      <p className="mb-4 text-sm text-gray-400">Видите кто, сколько и когда должен вернуть. Статусы обновляются в реальном времени</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto space-y-2 rounded-xl bg-[#1a1a1a] border border-[#262626] p-3">
        {debts.map((debt, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg bg-[#0f0f0f] px-3 py-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                {debt.image ? (
                  <AvatarImage src={debt.image} alt={debt.name} />
                ) : null}
                <AvatarFallback className={`${debt.color} text-white text-xs`}>
                  {debt.initials ||
                    debt.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{debt.name}</p>
                <p className="text-xs text-gray-500">{debt.info}</p>
              </div>
            </div>
            <span className={`text-xs font-medium ${statusColors[debt.status]}`}>{debt.status}</span>
          </div>
        ))}

        <Button
          variant="ghost"
          className="w-full justify-center text-gray-500 hover:text-white hover:bg-[#1f1f1f] mt-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Новый долг
        </Button>
      </div>
    </div>
  )
}
