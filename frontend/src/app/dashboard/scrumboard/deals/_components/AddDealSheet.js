"use client"

import { Sheet, SheetHeader, SheetTitle, SheetDescription, SheetContent } from '../../../../../components/ui/sheet';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../../components/ui/input'; // Assuming you have this component
import { Label } from '@radix-ui/react-label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select'; // Assuming you have these components
import { useState, useEffect } from 'react';
import {companyService} from "../../../../../services/companyService";
import {dealsService} from "../../../../../services/dealsService";
import {toast} from "sonner";
import { useRouter } from 'next/navigation';
import { useDealsStore} from "../../../../../store/useDeals";

export default function AddDealSheet({ isOpen, onOpenChange }) {
    const router = useRouter();
    const [companies, setCompanies] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { deals, addDeal } = useDealsStore();
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: '',
            description: '',
            amount: '',
            client_company_id: ''
        }
    });

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const response = await companyService.all();
                setCompanies(response.data.clientCompanies)
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }
        fetchCompanies();
    }, [])

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true)

            const dealData = {
                title: data.title,
                description: data.description,
                amount: parseFloat(data.amount),
                status: 'new',
                client_company_id: parseInt(data.client_company_id),
            }
            const response = await dealsService.createDeal(dealData);
            if(response.status === 200) {
                onOpenChange(false);
                console.log("Before adding:", useDealsStore.getState().deals); // Debug current state
                addDeal(response.data.message);
                console.log("After adding:", useDealsStore.getState().deals);
                toast.success("Deal created successfully");
                console.log("Deal created successfully:", response.data.message);
            }

            onOpenChange(false)
        } catch (error) {
            console.error("Error creating deal:", error);
            toast.error("Error creating deal");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCompanySelect = (value) => {
        setValue('client_company_id', value);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="w-[450px]">
                <SheetHeader>
                    <SheetTitle>Add New Deal</SheetTitle>
                    <SheetDescription>
                        Create a new deal and add it to the board.
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter deal title"
                            {...register('title', {required: true})}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="Enter deal description"
                            {...register('description')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            {...register('amount', {required: true})}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="client_company">Client Company</Label>
                        <Select onValueChange={handleCompanySelect}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a company"/>
                            </SelectTrigger>
                            <SelectContent>
                                {companies.map((company) => (
                                    <SelectItem key={company.id} value={company.id.toString()}>
                                        {company.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-primary text-white rounded-md px-4 py-2 mt-4 hover:bg-primary/90"
                    >
                        Create Deal
                    </button>
                </form>
            </SheetContent>
        </Sheet>
    );
}