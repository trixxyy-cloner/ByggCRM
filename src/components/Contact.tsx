export function Contact() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Kontakt</h2>

            <div className="space-y-6">
                <section className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Utvecklare</h3>
                    <div className="space-y-2 text-gray-600">
                        <p><strong>Namn:</strong> Sonny Johansson</p>
                        <p><strong>Email:</strong> <a href="mailto:dinemail@example.com" className="text-blue-500 hover:underline">trixxarn@gmail.com</a></p>
                        <p><strong>GitHub:</strong> <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://github.com/trixxyy-cloner</a></p>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Om Projektet</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Detta projekt är en del av en webbutvecklingskurs och syftar till att demonstrera 
                        kunskap inom React, TypeScript, och modern webbutveckling.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Prototypen fokuserar på en användarvänlig design och funktionell arkitektur som kan 
                        användas som grund för en fullständig SaaS-lösning för byggföretag.
                    </p>
                </section>

                <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Intresserad av ByggCRM?</h3>
                    <p className="text-gray-600 mb-4">
                        Kontakta mig för möjligheter till samarbete, feedback eller för att diskutera 
                        Implementering av systemet för ditt byggföretag.
                    </p>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                        Skicka ett meddelande
                    </button>
                </section>
            </div>
        </div>
    );
}