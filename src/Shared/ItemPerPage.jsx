import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";

export default function ItemPerPage() {

  return (

      <div className="relative w-[5rem]">
        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Item per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>10</SelectLabel>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
   
  );
}
