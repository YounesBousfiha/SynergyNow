import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../../../components/ui/sheet";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { toast } from "sonner";
import { contactService } from "../../../../services/contactService";
import { useContactStore } from "../../../../store/useContact";

export function EditContactSheet({
                                     isOpen,
                                     onClose,
                                     contact
                                 }) {
    const { updateContact } = useContactStore();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            job_title: formData.get('jobtitle'),
            company: formData.get('company'),
        };

        try {
            const response = await contactService.update(contact.id, data, contact.company_id);
            if (response.status === 200) {
                updateContact(contact.id, data);
                toast.success("Contact updated successfully");
                onClose();
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating contact");
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Edit Contact</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstname">First Name</Label>
                            <Input
                                id="firstname"
                                name="firstname"
                                defaultValue={contact.firstname}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input
                                id="lastname"
                                name="lastname"
                                defaultValue={contact.lastname}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={contact.email}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            defaultValue={contact.phone}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="jobtitle">Job Title</Label>
                        <Input
                            id="jobtitle"
                            name="jobtitle"
                            defaultValue={contact.jobtitle}
                        />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}