import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useState } from "react";

const ThemeSwitcher = ({ setTheme }: { setTheme: (theme: string | null) => void }) => {

  const [currentTheme, setCurrentTheme] = useState<string | null>('secondary');

  const changeTheme = (theme: string | null) => {
      setCurrentTheme(theme);
      setTheme(theme);
    }

  const resetTheme = () => {
    changeTheme(null);
  };

  return (
    <div className="mb-2">
      <Dropdown as={ButtonGroup} size="lg">
        <Button
          className="text-capitalize"
          variant={currentTheme ? currentTheme : "secondary"}
        >
          {currentTheme ? currentTheme : "Theme"}
        </Button>
        <Dropdown.Toggle
          split
          variant={currentTheme ? currentTheme : "secondary"}
          id="dropdown-split-basic"
        />
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" onClick={() => changeTheme("primary")}>
            Primary
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => changeTheme("danger")}>
            Danger
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={() => changeTheme("success")}>
            Success
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4" onClick={resetTheme}>
            Default Theme
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ThemeSwitcher;