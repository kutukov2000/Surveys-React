import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

function QuestionTypeDropdown({selectedValue,selectedKeys,setSelectedKeys}) {

  return (
    <div className="d-flex align-items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}>
          <DropdownItem key="Text">Text</DropdownItem>
          <DropdownItem key="RadioButton">RadioButton</DropdownItem>
          <DropdownItem key="CheckBox">CheckBox</DropdownItem>
          <DropdownItem key="Date">Date</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default QuestionTypeDropdown;
