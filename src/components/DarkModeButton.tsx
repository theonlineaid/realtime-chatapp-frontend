import React, { useState, useEffect } from 'react';

const DarkModeButton = () => {
  const [theme, setTheme] = useState('system')

  const options = [
    {iocn:  "sunny", text: 'light'},
    {icon: "moon", text: 'dark'},
    {icon: "desktop", text: 'system'}
  ]

  return (
    <div className="flex">
    </div>
  );
};

export default DarkModeButton;
