import { createBrowserRouter } from "react-router"
import { SiteLayout } from "./SiteLayout"
import { HomePage } from "../pages/HomePage"
import { ContentPage } from "../pages/ContentPage"
import { ContactPage } from "../pages/ContactPage"
import { ReviewsPage } from "../pages/ReviewsPage"

import { MenuPage } from "../pages/MenuPage"
import { AboutPage } from "../pages/AboutPage"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "reviews",
        element: <ReviewsPage />,
      },
      {
        path: "journal",
        element: (
          <ContentPage
            eyebrow="Notes from Banacho"
            title="Stories served fresh"
            intro="Small dispatches from the kitchen, the neighborhood, and the people around our tables."
            items={[
              [
                "The crunch test",
                "Why every batch of our fried chicken gets a double-fry.",
              ],
              [
                "A guide to falooda",
                "The beloved layered dessert with a very colorful history.",
              ],
              [
                "Plants at the table",
                "How we built a greener, calmer room in the middle of town.",
              ],
            ]}
          />
        ),
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
])
