import Image from 'next/image';

export default function TrustedSection() {

    const list = [
        {
            name: "Slack",
            imgUrl : "https://res.cloudinary.com/dashccxm0/image/upload/v1744487248/slack-icon-white_cwjpxi.png"
        },
        {
            name: "Amazon",
            imgUrl: "https://res.cloudinary.com/dashccxm0/image/upload/v1744486506/amazon-white-icon_zkker6.png"
        },
        {
            name: "DropBox",
            imgUrl: "https://res.cloudinary.com/dashccxm0/image/upload/v1744486623/dropbox-white-icon_sfhsoz.png"
        },
        {
            name: "MicroSoft",
            imgUrl: "https://res.cloudinary.com/dashccxm0/image/upload/v1744486622/windows-white-icon_oolqfv.png"
        },
        {
            name: "EverNote",
            imgUrl: "https://res.cloudinary.com/dashccxm0/image/upload/v1744487072/evernote-512_vflle9.png"
        },
        {
            name: "Paypal",
            imgUrl: "https://res.cloudinary.com/dashccxm0/image/upload/v1744487072/paypal-2-512_nimujb.png"
        }
    ]
    return (
        <>
            <div className="bg-[#296C5C] py-4 space-y-6 py-12 sm:flex sm:flex-col sm:justify-center">
                <h1 className="text-center text-white text-xl font-extrabold sm:text-4xl sm:pb-4">Truseted By the Top Company in the World:</h1>
                <div className="grid grid-cols-2 sm:flex sm:justify-around place-items-center gap-6">
                    {list.map((element, index) => {
                        return <ImageSections key={index} props={element} />
                    })}
                </div>
            </div>
        </>
    );
}

function ImageSections({ props }) {
    return (
        <div className="flex flex-col justify-center items-center">
            <Image src={props.imgUrl} alt={props.name} width={60} height={60}/>
            <p className="text-white text-lg font-extrabold text-center">{ props.name} </p>
        </div>
    );
}