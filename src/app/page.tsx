import { logoutAction } from '@/actions';
import { Button } from '@/components/ui/button';
import { userService } from '@/lib/api';

export default async function Page() {
  const user = await userService.fetchMe();
  return (
    <>
      Hello world!<Button onClick={logoutAction}>Logout</Button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
