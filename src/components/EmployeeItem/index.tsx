import { Link } from "react-router-dom";

export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  address: string;
}

interface EmployeeItemProps {
  person: IPerson; // Ожидаем один объект IPerson
}

export default function EmployeeItem({ person }: EmployeeItemProps) {
  return (
    <Link to={`/employees/${person.id}`}>
      <div>
        <div className="flex justify-between bg-gray-700/20 w-full p-3 mt-5 rounded-lg">
          <div className=" w-full">
            {" "}
            <div className="flex items-center">
              <div className=" w-6 h-px ml-3 rotate-90 bg-white/20 "></div>
              <h3 className="text-white font-medium">
                {person.firstName} {person.lastName}
              </h3>
            </div>
          </div>
          <div className=" w-full">
            {" "}
            <div className="flex items-center">
              <div className=" w-6 h-px ml-1 rotate-90 bg-white/20 "></div>
              <h3 className="text-white font-medium">{person.age}</h3>
            </div>
          </div>
          <div className=" w-full">
            <div className="flex items-center">
              <div className=" w-6 h-px rotate-90  bg-white/20 "></div>
              <h3 className="text-white font-medium">{person.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
