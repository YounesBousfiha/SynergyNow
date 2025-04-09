import AboutImage from "./_componenets/AboutImage";

export default function AboutPage() {
    return (
        <main className="flex-grow bg-white">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-16">
                    This Why We&apos;re Building
                    <br/>
                    SynegergyNow
                </h1>

                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Problem Section */}
                    <section>
                        <h2 className="text-2xl font-bold italic mb-6">Problem</h2>
                        <p className="text-black leading-relaxed">
                            SMEs need a simple CRM tool to centralize customer information, streamline communication,
                            and automate
                            repetitive tasks. Contact and interaction management is often fragmented, reducing
                            productivity. The
                            lack of modern technologies like AI limits personalization and efficiency. An intuitive,
                            centralized
                            solution is required to address these challenges.
                        </p>
                    </section>

                    {/* Solution Section */}
                    <section>
                        <h2 className="text-2xl font-bold italic mb-6">Solution</h2>
                        <p className="text-black leading-relaxed">
                            SynergyNow centralizes contact, company, and interaction management through an intuitive
                            interface. The
                            app integrates communication tools (emails, live chat) and automates tasks using AI to
                            generate
                            personalized messages. It offers a customizable dashboard, task and document management, all
                            secured and
                            accessible across devices.
                        </p>
                    </section>

                    {/* Our Team Section */}
                    <section>
                        <h2 className="text-2xl font-bold italic mb-6">Our Team</h2>
                        <div className="w-full">
                            <AboutImage
                                url="/placeholder.svg?height=320&width=800"
                                alt={"SynergyNow Team"}
                                width={60}
                                height={60}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}