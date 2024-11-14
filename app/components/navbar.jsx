import Link from 'next/link'

const navItems = {
  '/': { name: 'home' },
  '/words': { name: 'words' },
  '/songs': { name: 'songs' },
}

export function Navbar() {
  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row flex-wrap items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row flex-wrap space-x-0 bg-searchbackground rounded-xl px-8">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="transition-all hover:text-neutral-300 flex align-middle relative py-1 px-2 m-1"
              >
                {name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  )
}
