export default function Heading({ title, description }) {
    return (
        <>
            <div className="flex flex-col p-8">
                <p className="text-3xl font-bold">{title}</p>
                <p className="text-base">{description}</p>
            </div>
        </>
    )
}