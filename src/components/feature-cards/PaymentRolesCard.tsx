import { Trophy, ArrowUpRight, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const achievements = [
  { title: "Надёжный заёмщик", desc: "Вернул 5 долгов вовремя", earned: true, icon: "🏅" },
  { title: "Финансовый гуру", desc: "28 уровень достигнут", earned: true, icon: "🏆" },
  { title: "Пунктуальность", desc: "Ни одной просрочки", earned: false, icon: "⏱️" },
]

export function PaymentRolesCard() {
  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a]">
        <Trophy className="h-5 w-5 text-yellow-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Система достижений</h3>
      <p className="mb-4 text-sm text-gray-400">28 уровней мотивации: соблюдайте финансовую дисциплину и получайте награды</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto space-y-3 rounded-xl bg-[#1a1a1a] border border-[#262626] p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/professional-man-portrait.png" alt="Алексей Петров" />
              <AvatarFallback className="bg-gray-600 text-white">АП</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">Алексей Петров</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-yellow-400 font-medium">Уровень 12 · Эксперт</span>
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-500">из 28</span>
        </div>

        <div className="w-full bg-[#0f0f0f] rounded-full h-1.5 mb-4">
          <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: "43%" }} />
        </div>

        {achievements.map((ach, i) => (
          <div key={i} className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${ach.earned ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-[#0f0f0f] border border-[#262626]"}`}>
            <div className="flex items-center gap-3">
              <span className="text-lg">{ach.icon}</span>
              <div>
                <p className={`text-sm font-medium ${ach.earned ? "text-white" : "text-gray-500"}`}>{ach.title}</p>
                <p className="text-xs text-gray-600">{ach.desc}</p>
              </div>
            </div>
            {ach.earned && <span className="text-xs text-yellow-400 font-medium">Получено</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
