import { getRestaurantsApi } from '@/api/get-restaurants'
import { SharedScreenComponent } from '@/components/common/shared-screen'
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
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
            body={<PostRestaurantComponent restaurantId={restaurant.id} />}
            sharedScreen={<SharedScreenComponent />}
            footer={<>{`You are editing the ${restaurant.title}.`}</>}
          />
        )
      })}
      <SheetComponent
        trigger={
          <Button type="button" className="h-full rounded-lg grid">
            New Restaurant
          </Button>
        }
        title="You are creating a new restaurant"
        description="Fill the fields and save it when you are done."
        body={<PostRestaurantComponent />}
        footer={<>Footer</>}
      />
    </div>
  )
}
