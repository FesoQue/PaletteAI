import { View, Close } from "@/icons/icons";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function MyDialog({ color, rgb, name }) {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const clickToCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`copied ${text}`);
    } catch (err) {
      toast.error("Failed to copy ");
    }
  };

  return (
    <div>
      <button
        className="flex item-center justify-center text-[12px] text-gray-700 uppercase bg-white py-2 px-3 "
        onClick={openModal}
      >
        <span className="mr-2">
          <View />
        </span>{" "}
        View <span className="hidden md:inline mx-1">color</span> code
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-[35%]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end md:items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full relative max-w-xl transform  rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <p className="text-capitalize font-semibold text-base mb-4">
                      Color Name: {name}
                    </p>
                    <div
                      className="rounded overflow-hidden"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 4px",
                      }}
                    >
                      <div
                        className="modal-color-bg w-full h-[120px] grid place-items-center cursor-pointer"
                        style={{ background: `${color}` }}
                        onClick={() => clickToCopy(color)}
                      >
                        <button className="text-xs uppercase bg-white p-2 font-semibold rounded">
                          click to copy hex
                        </button>
                      </div>
                      <div className="py-4">
                        <div className="flex items-center justify-between px-3 pb-4 mb-4 border-b border-b-1 border-b-gray-200">
                          <div className="">
                            <p className="uppercase text-sm mb-1">hex:</p>
                            <p className="font-semibold text-[13px] text-gray-700">
                              {color}
                            </p>
                          </div>
                          <button
                            className="copy-btn uppercase text-sm font-bold text-gray-500 px-3 py-1 border border01 border-gray-400 rounded hover:text-gray-600"
                            onClick={() => clickToCopy(color)}
                          >
                            Copy
                          </button>
                        </div>
                        <div className="flex items-center justify-between px-3">
                          <div className="">
                            <p className="uppercase text-sm mb-1">Rgb:</p>
                            <p className="font-semibold text-[13px] text-gray-700">
                              {rgb}
                            </p>
                          </div>
                          <button
                            className="copy-btn uppercase text-sm font-bold text-gray-500 px-3 py-1 border border01 border-gray-400 rounded hover:text-gray-600"
                            onClick={() => clickToCopy(rgb)}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="absolute top-3 right-3"
                    onClick={closeModal}
                  >
                    <span className="text-gray-700">
                      <Close />
                    </span>
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          <Toaster />
        </Dialog>
      </Transition>
    </div>
  );
}
