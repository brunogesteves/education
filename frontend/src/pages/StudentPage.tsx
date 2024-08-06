import InfoStudent from "../components/Students/Info/InfoStudent.view";

const StudentsPage: React.FC = () => {
  return (
    <div className="bg-[#FFF2F3]">
      <img src="/logo.jpeg" width="100" alt="logo" />

      <InfoStudent />
    </div>
  );
};

export default StudentsPage;
