// components/Card.tsx
import React from "react";
import { Button } from "../ui/button";
import "../../app/globals.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UpgradePlan: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 mb-20">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-semibold text-text-primary">
          요금제를 업그레이드 하여 보다 좋은 서비스를 즐겨보세요
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="transparent"
          stroke="currentColor"
          className="w-6 h-6 text-text-disabled cursor-pointer"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.775 8.69a2.484 2.484 0 0 1 4.708 1.103c0 .693-.284 1.319-.74 1.77-.553.543-1.223 1.13-1.548 1.82M12 16.69v.01m0 3.3a8 8 0 1 1 0-16 8 8 0 0 1 0 16"
          />
        </svg>
      </div>
      <Tabs
        defaultValue="overview"
        className="p-1 w-[408px] m-auto flex justify-center items-center bg-gray-200 border border-solid border-white-50 rounded-2xl"
      >
        <TabsList className="flex w-full">
          <TabsTrigger
            value="overview"
            className="bg-white-100 h-9 flex flex-1 justify-center rounded-2xl"
          >
            <span>연간</span>
            <span className="font-bold pl-2 bg-gradient-to-r from-[#8688F7] to-[#6F72F3] bg-clip-text">
              -20% 절약
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="text-text-disabled font-normal bg-transparent h-9 flex flex-1 justify-center rounded-2xl"
          >
            <span>월간</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-start">
        <div className="w-full grid gap-4 grid-cols-4 max-lg:grid-cols-1">
          <div className="p-6 bg-gradient-to-b from-white/0 to-white/[2%] border border-solid border-border-primary rounded-lg flex-1">
            <div className="flex flex-col gap-2">
              <div className="h-8 flex justify-between items-center">
                <div className="text-xl font-bold">Basic</div>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-4xl text-text-primary font-semibold ">
                  $0
                </div>
                <div>/ month</div>
              </div>
              <div className="h-4 text-xs text-text-disabled" />
            </div>
            <div className="w-full my-8 border-0 border-b border-solid border-border-primary" />
            <button
              type="button"
              className="ant-btn css-fi9w5k ant-btn-primary mb-8 w-full rounded-full"
              disabled
            >
              <span>Your Current Plan</span>
            </button>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Initial credits 100
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Daily renew credits 50
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-b from-white/0 to-white/[2%] border border-solid border-border-primary rounded-lg flex-1">
            <div className="flex flex-col gap-2">
              <div className="h-8 flex justify-between items-center">
                <div className="text-xl font-bold">Standard</div>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-4xl text-text-disabled line-through">
                  $5
                </div>
                <div className="text-4xl text-text-primary font-semibold ">
                  $4
                </div>
                <div>/ month</div>
              </div>
              <div className="h-4 text-xs text-text-disabled">
                billed yearly as $48
              </div>
            </div>
            <div className="w-full my-8 border-0 border-b border-solid border-border-primary" />
            <button
              type="button"
              className="ant-btn css-fi9w5k ant-btn-primary mb-8 w-full rounded-full"
            >
              <span>Change Plan</span>
            </button>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Daily renew credits 50
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Monthly renew credits 1000
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Remove watermarks on generated videos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Can purchase more credits
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  4 Concurrent Generations
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-b from-white/0 to-white/[2%] border border-solid border-border-primary rounded-lg flex-1">
            <div className="flex flex-col gap-2">
              <div className="h-8 flex justify-between items-center">
                <div className="text-xl font-bold">Pro</div>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-4xl text-text-disabled line-through">
                  $30
                </div>
                <div className="text-4xl text-text-primary font-semibold ">
                  $24
                </div>
                <div>/ month</div>
              </div>
              <div className="h-4 text-xs text-text-disabled">
                billed yearly as $288
              </div>
            </div>
            <div className="w-full my-8 border-0 border-b border-solid border-border-primary" />
            <button
              type="button"
              className="ant-btn css-fi9w5k ant-btn-primary mb-8 w-full rounded-full"
            >
              <span>Change Plan</span>
            </button>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Daily renew credits 50
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Monthly renew credits 6000
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Remove watermarks on generated videos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Can purchase more credits
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Fast generation provided (Limited Free)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  8 Concurrent Generations
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-b from-white/0 to-white/[2%] border border-solid border-border-primary rounded-lg flex-1">
            <div className="flex flex-col gap-2">
              <div className="h-8 flex justify-between items-center">
                <div className="text-xl font-semibold">Premium</div>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-4xl text-text-disabled line-through">
                  $60
                </div>
                <div className="text-4xl text-text-primary font-semibold ">
                  $48
                </div>
                <div>/ month</div>
              </div>
              <div className="h-4 text-xs text-text-disabled">
                billed yearly as $576
              </div>
            </div>
            <div className="w-full my-8 border-0 border-b border-solid border-border-primary" />
            <button
              type="button"
              className="ant-btn css-fi9w5k ant-btn-primary mb-8 w-full rounded-full"
            >
              <span>Change Plan</span>
            </button>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Daily renew credits 50
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Monthly renew credits 15000
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Remove watermarks on generated videos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Can purchase more credits
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  Fast generation provided (Limited Free)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>
                </span>
                <span className="text-xs text-text-disabled">
                  12 Concurrent Generations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;

export { UpgradePlan };
