export function BusinessPlan() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Affärsplan</h2>

            <div className="space-y-6">
                <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Affärsidé</h3>
                    <p className="text-gray-600 leading-relaxed">
                        ByggCRM är ett Customer Relationship Management-system utformat specifikt för byggföretag. 
                        Systemet syftar till att effektivisera och digitalisera projekthantering, kundkommunikation och 
                        dokumentation för byggföretag av alla storlekar.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Problem och Möjligheter</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Många byggföretag använder ännu pappersbaserade system eller generiska CRM-lösningar som inte 
                        passar deras speciella behov. ByggCRM löser detta genom att erbjuda en skräddarsydd lösning 
                        för byggbranschens unika arbetsflöden.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Målgrupp</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Små och medelstora byggföretag som behöver bättre projekthantering, kundhantering och 
                        dokumenthantering.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Värde</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Ökad effektivitet i projekthantering</li>
                        <li>Bättre kundkommunikation och relationshållning</li>
                        <li>Centraliserad dokumenthantering</li>
                        <li>Minskade manuella administrativa arbetsuppgifter</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}