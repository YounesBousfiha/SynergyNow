"use client"

import DealsColumn from "./_components/DealsColumn";
import DealCard from "./_components/DealCard";
import { useState, useEffect} from "react";
import {toast} from "sonner";
import { dealsService} from "../../../../services/dealsService";

export default function DealsManagerPage() {

    const [deals, setDeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function fetchDeals() {
            try {
                const response = await dealsService.getDeals();
                console.log("Deals:", response);
                setDeals(response.message);
                setIsLoading(false);

            } catch (error) {
                toast.error("Error while loading the deals")
            }
        }

        fetchDeals()
    }, [])


    const newDeals = deals.filter(deal => deal.status === "new");
    const followUpsDeals = deals.filter(deal => deal.status === "follow_up");
    const underReviewDeals = deals.filter(deal => deal.status === "under_review");
    const wonDeals = deals.filter(deal => deal.status === "closed_won");
    const lostDeals = deals.filter(deal => deal.status === "closed_not_won");


    const newCount = newDeals.length;
    const followUpsCount = followUpsDeals.length;
    const underReviewCount = underReviewDeals.length;
    const wonCount = wonDeals.length;
    const lostCount = lostDeals.length;

    if(isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#296c5c]"></div>
            </div>
        )
    }

    return (
            <div className="flex-1">
                {/* Content */}
                <main className="p-6 overflow-x-auto">
                    <h1 className="text-2xl font-bold mb-6">Deals Manager</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 min-w-max">

                        {/* New Column */}
                        <DealsColumn title="New" count={newCount}>
                            {newDeals.map((deal) => {
                                return (
                                    <DealCard key={deal.id} id={deal.id} deal={deal}/>
                                )
                            })}
                        </DealsColumn>

                        {/* FollowUps Column */}
                        <DealsColumn title="FollowUps" count={followUpsCount}>
                            {followUpsDeals.map((deal) => {
                                return (
                                    <DealCard key={deal.id} id={deal.id} deal={deal}/>
                                )
                            })}
                        </DealsColumn>

                        {/* UnderReview Column */}
                        <DealsColumn title="UnderReview" count={underReviewCount}>
                            {underReviewDeals.map((deal) => {
                                return (
                                    <DealCard key={deal.id} id={deal.id} deal={deal}/>
                                )
                            })}
                        </DealsColumn>

                        {/* Demo Column */}
                        <DealsColumn title="Won" count={wonCount}>
                            {wonDeals.map((deal) => {
                                return (
                                    <DealCard key={deal.id} id={deal.id} deal={deal}/>
                                )
                            })}
                        </DealsColumn>
                        <DealsColumn title="Lost" count={lostCount}>
                            {lostDeals.map((deal) => {
                                return (
                                    <DealCard key={deal.id} id={deal.id} deal={deal}/>
                                )
                            })}
                        </DealsColumn>
                    </div>
                </main>
            </div>
    )
}

