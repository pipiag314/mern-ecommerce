type InformationCardProps = {
    text: string;
}

const InformationCard: React.FC<InformationCardProps> = ({ text }) => {
  return (
    <div className="bg-[#f2f2f2] rounded-2xl min-w-[200px] text-center p-2 mt-5">
        <p className="italic">{text}</p>
    </div>
  )
}
export default InformationCard