import { getRestaurantsApi } from '@/api/get-restaurants'
import { SecondaryDivSheetComponent } from '@/components/common/secondary-div-sheet-component'
import { SheetComponent } from '@/components/common/sheet-component'
import { PostRestaurantComponent } from '@/components/form/post-restaurant'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'

export function Forms() {
  const { data: restaurantsList } = useQuery({
    queryKey: ['list-of-restaurants'],
    queryFn: getRestaurantsApi,
  })

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
      {restaurantsList?.restaurants.map((restaurant) => {
        return (
          <SheetComponent
            key={restaurant.id}
            trigger={
              <Card>
                <CardHeader>
                  <CardTitle>{restaurant.title}</CardTitle>
                </CardHeader>
                <CardContent>{restaurant.email}</CardContent>
              </Card>
            }
            title={`Restaurant ${restaurant.title}`}
            description="Edit the restaurant and save the changes."
            primaryDiv={
              <PostRestaurantComponent restaurantId={restaurant.id} />
            }
            secondaryDiv={<SecondaryDivSheetComponent />}
            footer={<>{`You are editing the ${restaurant.title}.`}</>}
          />
        )
      })}
      <SheetComponent
        trigger={
          <Button type="button" className="grid rounded-lg h-full">
            New Restaurant
          </Button>
        }
        title="You are creating a new restaurant"
        description="Fill the fields and save it when you are done."
        primaryDiv={<PostRestaurantComponent />}
        secondaryDiv={<SecondaryDivSheetComponent />}
        footer={<>Footer</>}
      />
    </div>
  )
}
