"use client";

export default function AccountSidebar() {
  return (
    <aside className="w-[220px]">
      <div>
        <h3 className="font-medium mb-4">
          Manage My Account
        </h3>

        <ul className="space-y-2 ml-5">
          <li className="text-primary">
            My Profile
          </li>

          <li className="text-gray-500">
            Address Book
          </li>

          <li className="text-gray-500">
            My Payment Options
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-4">
          My Orders
        </h3>

        <ul className="space-y-2 ml-5">
          <li className="text-gray-500">
            My Returns
          </li>

          <li className="text-gray-500">
            My Cancellations
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="font-medium">
          My Wishlist
        </h3>
      </div>
    </aside>
  );
}