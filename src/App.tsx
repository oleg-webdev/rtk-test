import React from 'react';
import './App.css';
import { AppUsersComponent } from './features/app-users/AppUsers';

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>

            <div>
                <AppUsersComponent />
            </div>
        </div>
    );
}

export default App;
