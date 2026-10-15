import { test, expect} from '../fixtures';
import { HeaderComponent } from '../../pages/components/HeaderComponent';
import { generateUniqueEmail } from '../../utils/dataGenerator';

test.describe('Subscription', ()=>{
    let headerComponent: HeaderComponent;
    let email: string;
    test.beforeEach(async({page})=>{
        headerComponent = new HeaderComponent(page);
        email = generateUniqueEmail();
        await headerComponent.open();
    })
    test('Subscribe with unique email should be successfull', async({page})=>{
        await expect(headerComponent.subscriptionLabel).toBeVisible();

        await headerComponent.subscribeEmail(email);

        await expect(headerComponent.subscriptionSuccessLabel).toBeVisible();
    })
    test('Subscribe from the Cart page with unique email should be successfull', async({page})=>{
        await headerComponent.openCart();

        await expect(headerComponent.subscriptionLabel).toBeVisible();

        await headerComponent.subscribeEmail(email);

        await expect(headerComponent.subscriptionSuccessLabel).toBeVisible();

    })
})