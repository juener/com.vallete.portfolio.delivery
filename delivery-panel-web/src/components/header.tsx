import { getUserProfileApi } from '@/api/get-user-profile'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from './common/nav-link'
import { SheetComponent } from './common/sheet-component'
import { PatchUserFormComponent } from './form/patch-user'
import { ThemeToggle } from './theme/theme-toggle'

export function Header() {
  const { data: profileDetails } = useQuery({
    queryKey: ['profile-details'],
    queryFn: getUserProfileApi,
  })

  return (
    <div className="bg-primary rounded-lg text-white p-4 cursor-pointer flex flex-row items-center  justify-between">
      <div className="flex flex-row gap-3">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/finance">Finance</NavLink>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <SheetComponent
          trigger={<span>{profileDetails?.user.name}</span>}
          title={`Editing the User ${profileDetails?.user.name}`}
          description="You may edit your account details."
          body={<PatchUserFormComponent />}
          footer={
            <span className="font-light text-xs italic">
              You are editing the user {profileDetails?.user.name}.
            </span>
          }
        />
        <ThemeToggle />
      </div>
    </div>
  )
}
