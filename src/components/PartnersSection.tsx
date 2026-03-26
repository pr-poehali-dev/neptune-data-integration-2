import Icon from "@/components/ui/icon"

const partners = [
  { name: "Сбербанк", icon: "Building2" },
  { name: "Тинькофф", icon: "CreditCard" },
  { name: "Альфа-Банк", icon: "Landmark" },
  { name: "ВТБ", icon: "Shield" },
  { name: "Россельхозбанк", icon: "Leaf" },
  { name: "Открытие", icon: "Globe" },
  { name: "Совкомбанк", icon: "Star" },
]

export function PartnersSection() {
  return (
    <section className="py-8 px-4">
      <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">Открыты к партнёрству с банками</p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {partners.map((partner) => (
          <div key={partner.name} className="flex items-center gap-2 text-gray-500">
            <Icon name={partner.icon} className="h-4 w-4" />
            <span className="text-sm font-medium">{partner.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
