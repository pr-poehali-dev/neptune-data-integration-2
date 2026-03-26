import { MessageCircle, ArrowUpRight, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const messages = [
  { from: "Мария Иванова", text: "Привет! Можешь перенести срок возврата?", time: "14:22", mine: false, image: "/professional-woman-portrait.png" },
  { from: "Вы", text: "Да, перенесу на 5 апреля. Подтверди обновление.", time: "14:25", mine: true },
  { from: "Мария Иванова", text: "Подтверждаю! Спасибо 🙌", time: "14:26", mine: false, image: "/professional-woman-portrait.png" },
]

export function SendFundsCard() {
  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a]">
        <MessageCircle className="h-5 w-5 text-yellow-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Чат по каждому долгу</h3>
      <p className="mb-4 text-sm text-gray-400">Обсуждайте условия займа прямо в приложении — всё зафиксировано и прозрачно</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto rounded-xl bg-[#1a1a1a] border border-[#262626] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src="/professional-woman-portrait.png" alt="Мария" />
              <AvatarFallback className="bg-yellow-600 text-white text-xs">МИ</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-white">Мария Иванова</span>
          </div>
          <span className="text-xs text-yellow-400 font-medium">5 000 ₽ · Активен</span>
        </div>

        <div className="flex flex-col gap-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.mine ? "flex-row-reverse" : "flex-row"}`}>
              {!msg.mine && (
                <Avatar className="h-6 w-6 flex-shrink-0 mt-1">
                  {msg.image && <AvatarImage src={msg.image} alt={msg.from} />}
                  <AvatarFallback className="bg-yellow-600 text-white text-xs">МИ</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[75%] rounded-xl px-3 py-2 ${msg.mine ? "bg-yellow-500/20 text-white" : "bg-[#0f0f0f] text-gray-200"}`}>
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <p className="text-xs text-gray-600 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[#0f0f0f] border border-[#262626] px-3 py-2 mt-1">
          <input
            type="text"
            placeholder="Написать сообщение..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
          />
          <Send className="h-4 w-4 text-yellow-400 cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
