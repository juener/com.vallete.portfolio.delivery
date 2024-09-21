import { getUserProfileApi } from '@/api/get-user-profile'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from './common/nav-link'
import { SheetComponent } from './common/sheet-component'
import { PatchUserComponent } from './form/patch-user'
import { ThemeToggle } from './theme/theme-toggle'
import { SecondaryDivSheetComponent } from './common/secondary-div-sheet-component'

export function Header() {
  const { data: profileDetails } = useQuery({
    queryKey: ['profile-details'],
    queryFn: getUserProfileApi,
  })

  return (
    <div className="flex flex-row justify-between items-center bg-primary p-4 rounded-lg text-white cursor-pointer">
      <div className="flex flex-row gap-3">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/forms">Forms</NavLink>
      </div>
      <div className="flex flex-row items-center gap-3">
        <SheetComponent
          trigger={<span>{profileDetails?.user.name}</span>}
          title={`Editing the User ${profileDetails?.user.name}`}
          description="You may edit your account details."
          primaryDiv={<PatchUserComponent />}
          secondaryDiv={<SecondaryDivSheetComponent />}
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
