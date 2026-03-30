export function ProjectIdea() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Projektidé - ByggCRM Prototyp</h2>

            <div className="space-y-6">
                <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Vad är ByggCRM?</h3>
                    <p className="text-gray-600 leading-relaxed">
                        En webbaserad CRM-lösning speciellt designad för byggföretag. Prototypen fokuserar på 
                        de viktigaste funktionerna för att demonstrera systemets grundläggande värde.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Huvudfunktioner</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Kundhantering - lagra och uppdatera kunduppgifter</li>
                        <li>Projektöversikt - se alla aktiva projekt</li>
                        <li>Tidrapportering - logga arbetade timmar per projekt</li>
                        <li>Dashboard - snabbtitt på nyckeltal</li>
                        <li>Dokumenthantering - ladda upp och dela projektdokument</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Teknikstack</h3>
                    <p className="text-gray-600 mb-2">Frontend:</p>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        <li>React + TypeScript</li>
                        <li>Vite (byggverktyg)</li>
                        <li>Tailwind CSS (styling)</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidplan</h3>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        <li>Iteration 1: Grundläggande UI och datainmatning</li>
                        <li>Iteration 2: Backend-integrering och användarautentisering</li>
                        <li>Iteration 3: Avancerade funktioner och optimering</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}