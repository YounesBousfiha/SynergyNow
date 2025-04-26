import DealsColumn from "./_components/DealsColumn";
import DealCard from "./_components/DealCard";

export default function DealsManagerPage() {
    return (
            <div className="flex-1">
                {/* Content */}
                <main className="p-6 overflow-x-auto">
                    <h1 className="text-2xl font-bold mb-6">Deals Manager</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 min-w-max">
                        {/* Unassigned Column */}
                        <DealsColumn title="Unassigned" count={1}>
                            <DealCard />
                        </DealsColumn>

                        {/* New Column */}
                        <DealsColumn title="New" count={2}>
                            <DealCard />
                            <DealCard />
                        </DealsColumn>

                        {/* FollowUps Column */}
                        <DealsColumn title="FollowUps" count={1}>
                            <DealCard />
                        </DealsColumn>

                        {/* UnderReview Column */}
                        <DealsColumn title="UnderReview" count={2}>
                            <DealCard />
                            <DealCard />
                        </DealsColumn>

                        {/* Demo Column */}
                        <DealsColumn title="Won" count={1}>
                            <DealCard />
                        </DealsColumn>
                        <DealsColumn title="Lost" count={1}>
                            <DealCard />
                        </DealsColumn>
                    </div>
                </main>
            </div>
    )
}

