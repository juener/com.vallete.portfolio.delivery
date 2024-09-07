import { ThemeToggle } from './theme/theme-toggle'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

const administrativeItems = [
  { label: 'One More', path: '/one-more' },
  { label: 'Second', path: '/second' },
  { label: 'Third Item', path: '/third-item' },
]

const financeItems = [
  { label: 'Finance One More', path: '/one-more' },
  { label: 'Finance Second', path: '/second' },
  { label: 'Finance Third Item', path: '/third-item' },
]

const registerItems = [
  { label: 'Register One More', path: '/one-more' },
  { label: 'Register Second', path: '/second' },
  { label: 'Register Third Item', path: '/third-item' },
  { label: 'Fourth Item', path: '/fourth-item' },
]

const userItems = [
  { label: 'User One More', path: '/one-more' },
  { label: 'User Another', path: '/second' },
]

function navigationMenuLinkHomeStyle() {
  return 'px-8 text-secondary hover:text-foreground hover:cursor-pointer'
}

function navigationMenuLinkStyle() {
  return 'flex flex-col items-center justify-center w-screen h-12 bg-background hover:bg-primary text-foreground hover:text-foreground hover:cursor-pointer rounded-lg'
}

export function Header() {
  return (
    <div className="h-14">
      <NavigationMenu>
        <NavigationMenuList className="w-screen p-2 bg-primary rounded-lg">
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuLinkHomeStyle()}>
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Administration</NavigationMenuTrigger>
            <NavigationMenuContent>
              {administrativeItems.map((item) => (
                <NavigationMenuLink className={navigationMenuLinkStyle()}>
                  {item.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Finance</NavigationMenuTrigger>
            <NavigationMenuContent>
              {financeItems.map((item) => (
                <NavigationMenuLink className={navigationMenuLinkStyle()}>
                  {item.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Register</NavigationMenuTrigger>
            <NavigationMenuContent>
              {registerItems.map((item) => (
                <NavigationMenuLink className={navigationMenuLinkStyle()}>
                  {item.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>User</NavigationMenuTrigger>
            <NavigationMenuContent>
              {userItems.map((item) => (
                <NavigationMenuLink className={navigationMenuLinkStyle()}>
                  {item.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuLinkHomeStyle()}>
              <ThemeToggle />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
