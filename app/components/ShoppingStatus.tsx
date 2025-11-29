import React from "react";
type Props = {
  status: "cart" | "checkout" | "final_payment";
};
const ShoppingStatus = ({ status }: Props) => {
  return (
    <div
      dir="rtl"
      className="mx-auto mb-10 flex h-40 w-full items-center justify-center p-4"
    >
      {(() => {
        const steps = [
          { key: "cart", label: "سبد خرید" },
          { key: "checkout", label: "تسویه حساب" },
          { key: "final_payment", label: "پرداخت نهایی" },
        ];
        const currentIndex = steps.findIndex((s) => s.key === status);

        return (
          <nav
            aria-label="مراحل خرید"
            className=" flex h-full w-full flex-col items-start justify-center rounded-lg bg-gradient-to-r from-blue-800 to-blue-700/90 p-4 text-blue-50 shadow-md"
          >
            <ol className="mx-auto flex w-full flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
              {steps.map((step, i) => {
                const isActive = i === currentIndex;
                const isDone = i < currentIndex;
                return (
                  <li
                    key={step.key}
                    className="flex w-full items-center  text-center sm:min-w-0 sm:flex-1 md:justify-center"
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="flex items-start sm:items-center">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 sm:h-10 sm:w-10 ${
                          isDone
                            ? "bg-green-400 text-white"
                            : isActive
                              ? "bg-white font-semibold text-blue-700"
                              : "bg-gray-600/80 text-gray-200"
                        }`}
                        aria-hidden="true"
                      >
                        {isDone ? (
                          <svg
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        ) : (
                          <span className="text-xs sm:text-sm">{i + 1}</span>
                        )}
                      </div>

                      <div className="mt-1 min-w-0 sm:mt-0 sm:mr-3">
                        <p
                          className={`truncate text-sm transition-colors duration-200 ${
                            isActive
                              ? "font-bold text-white"
                              : isDone
                                ? "text-green-100"
                                : "text-blue-200"
                          }`}
                        >
                          <span className="mr-2">{step.label}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Progress bar: hidden on very small screens to avoid cramped layout */}
            <div className="mt-3 hidden h-2 w-full rounded-full bg-blue-600/40 sm:block">
              <div
                className="h-2 rounded-full bg-white transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </nav>
        );
      })()}
    </div>
  );
};

export default ShoppingStatus;
