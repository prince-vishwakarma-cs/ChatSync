import { Menu } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const DropDownMenu = () => {
  return (
    <div className="fixed text-right top-24 w-52">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700">
              Options
              <ChevronDownIcon className="w-4 h-4 text-white/60" />
            </Menu.Button>

            <Menu.Items
              className={`${
                open ? "block" : "hidden"
              } w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-sm text-white transition-transform duration-150 ease-out`}
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-white/10" : ""
                    }`}
                  >
                    <PencilIcon className="w-4 h-4 text-white/30" />
                    Edit
                    <kbd
                      className={`ml-auto hidden text-xs text-white/50 ${
                        active ? "inline" : ""
                      }`}
                    >
                      ⌘E
                    </kbd>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-white/10" : ""
                    }`}
                  >
                    <Square2StackIcon className="w-4 h-4 text-white/30" />
                    Duplicate
                    <kbd
                      className={`ml-auto hidden text-xs text-white/50 ${
                        active ? "inline" : ""
                      }`}
                    >
                      ⌘D
                    </kbd>
                  </button>
                )}
              </Menu.Item>
              <div className="h-px my-1 bg-white/5" />
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-white/10" : ""
                    }`}
                  >
                    <ArchiveBoxXMarkIcon className="w-4 h-4 text-white/30" />
                    Archive
                    <kbd
                      className={`ml-auto hidden text-xs text-white/50 ${
                        active ? "inline" : ""
                      }`}
                    >
                      ⌘A
                    </kbd>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-white/10" : ""
                    }`}
                  >
                    <TrashIcon className="w-4 h-4 text-white/30" />
                    Delete
                    <kbd
                      className={`ml-auto hidden text-xs text-white/50 ${
                        active ? "inline" : ""
                      }`}
                    >
                      ⌘D
                    </kbd>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

export default DropDownMenu;
