
import { Stack } from '@mui/material';
import ThemeSwitcher from '../ThemeSwitcher/theme_switcher';
import './Header.css';
import { CSSProperties } from 'react';

function Header({ theme, setTheme }: { theme: string | null, setTheme: (theme: string | null) => void }){

    // Define a mapping from button settings to CSS color values
    const buttonColorMapping = {
        primary: '#007bff', // Example primary color
        secondary: '#6c757d', // Example secondary color
        success: '#28a745', // Example success color
        danger: '#dc3545', // Example danger color
        };

    // Check if theme matches any key in buttonColorMapping, else use a default color
    const backgroundColor = theme && buttonColorMapping[theme as keyof typeof buttonColorMapping] ? buttonColorMapping[theme as keyof typeof buttonColorMapping] : '#ffffff';

    const headerStyle: CSSProperties & {
        '--header-bg-color'?: string;
    } = {
        '--header-bg-color': backgroundColor,
    };

  return (
    <header className="header" style={headerStyle} >
      <Stack>
        <ThemeSwitcher setTheme={setTheme}/>
      </Stack>

    </header>
  );
}

export default Header;