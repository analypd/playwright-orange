import {test as driver } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const test = driver.extend <{ 
    login: LoginPage 
}>({
    login: async ({ page }, use) => await use(new LoginPage(page))      
});
export { test };