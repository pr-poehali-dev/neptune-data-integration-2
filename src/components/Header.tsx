import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-3">
        <img
          src="https://cdn.poehali.dev/projects/891031cd-516e-4b46-9f57-05cab3cb95f8/bucket/c1b98931-a0a9-4ea9-ab74-e39aeb1400f4.jpg"
          alt="В Долг"
          className="h-9 w-9 rounded-xl object-cover"
        />
        <span className="text-lg font-semibold text-white">
          В Долг<sup className="text-xs text-yellow-400">™</sup>
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Функции
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1">
          Для банков <ChevronDown className="h-4 w-4" />
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Безопасность
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          О сервисе
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Контакты
        </a>
      </nav>

      <Button
        variant="outline"
        className="rounded-full border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300 bg-transparent"
      >
        Скачать демо
      </Button>
    </header>
  )
}
