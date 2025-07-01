// pages/index.tsx
import { UpgradePlan } from "@/components/main/PlanDetails";
import { motion } from "framer-motion";
import "../../globals.css";
import { Button } from "@/components/ui/button";

export default function PlanPage() {
  return (
    <div className="flex flex-col gap-5 p-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-y-auto h-screen">
      <div className="flex flex-col mt-5 items-center justify-center gap-2 px-4 text-lg font-medium">
        <h1 className="text-2xl font-bold uppercase mb-2">이용 요금 안내</h1>
        <h3 className="text-lg">나에게 딱 맞는 요금제를 선택해 보세요</h3>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="text-2xl text-text-primary dark:text-gray-100 font-semibold">
            나의 요금제
          </div>
        </div>
        <div className="w-full p-6 bg-white dark:bg-gray-700 border border-solid border-border-primary dark:border-gray-600 rounded-md flex max-lg:flex-col gap-10">
          <div className="flex flex-col gap-7">
            <div className="text-sm text-text-disabled dark:text-gray-400">
              요금제
            </div>
            <div className="flex">
              <div
                className="text-xl font-bold"
              >
                일반방식
              </div>
            </div>
          </div>
          <div className="self-center max-lg:hidden h-[90px] border-0 border-l border-solid border-border-primary dark:border-gray-600" />
          <div className="flex flex-col gap-4">
            <div className="text-sm text-text-disabled dark:text-gray-400">
              보유중인 보석갯수
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className="text-2xl text-text-warning dark:text-yellow-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.563 4.48a.757.757 0 0 1 .692-.48h5.99c.563 0 .93.633.678 1.17l-1.704 3.635h2.521c.676 0 1.014.871.536 1.38l-8.974 9.573c-.566.604-1.51-.017-1.255-.827l1.913-6.122H7.258a.72.72 0 0 1-.361-.098.779.779 0 0 1-.274-.27.845.845 0 0 1-.058-.769z" />
                </svg>
                <span className="text-xl text-text-primary dark:text-gray-100 font-semibold">
                  150개
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-text-disabled dark:text-gray-400">
                    일별 보석갯수
                  </span>
                  <span className="text-xs text-text-primary dark:text-gray-100">
                    50
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-text-disabled dark:text-gray-400">
                  월별 보석갯수
                  </span>
                  <span className="text-xs text-text-primary dark:text-gray-100">
                    0
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-text-disabled dark:text-gray-400">
                    구입한 보석갯수
                  </span>
                  <span className="text-xs text-text-primary dark:text-gray-100">
                    100
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 max-lg:hidden" />
        </div>
      </div>
      <div className="w-full border-0 border-b border-solid border-border-primary dark:border-gray-600"></div>
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-semibold text-text-primary dark:text-gray-100">
            요금제 상세보기
          </div>
        </div>
        <div className="grid gap-4 grid-cols-3 max-lg:grid-cols-1">
          <div className="px-6 py-4 bg-gradient-to-b from-white to-white dark:from-gray-700 dark:to-gray-600 border border-solid border-background-third dark:border-gray-600 rounded-lg flex flex-col gap-4">
            <div className="w-full">
              <div className="text-xl font-semibold not-italic">
                이용중인 요금제
              </div>
            </div>
            <div className="border-0 border-b border-solid border-border-primary dark:border-gray-600" />
            <div className="text-text-disabled text-xs font-normal flex justify-between dark:text-gray-400">
              <span>요금제</span>
              <span>일반방식</span>
            </div>
            <div className="text-text-disabled text-xs font-normal flex justify-between dark:text-gray-400">
              <span>일별 보석갯수</span>
              <span>
                <span>50/50</span>
              </span>
            </div>
            <div className="text-text-disabled text-xs font-normal flex justify-between dark:text-gray-400">
              <span>월별 보석갯수</span>
              <span>
                <span>0</span>
              </span>
            </div>
            <div className="text-text-disabled text-xs font-normal flex justify-between dark:text-gray-400">
              <span>구입한 보석갯수</span>
              <span>
                <span>100</span>
              </span>
            </div>
            <div className="flex-1" />
          </div>
          <div className="px-6 py-4 bg-gradient-to-b from-white to-white dark:from-gray-700 dark:to-gray-600 border border-solid border-background-third dark:border-gray-600 rounded-lg flex flex-col gap-4">
            <div className="w-full">
              <div className="text-xl font-semibold not-italic">
                청구 및 결제
              </div>
            </div>
            <div className="border-0 border-b border-solid border-border-primary dark:border-gray-600" />
            <div className="text-text-disabled text-xs font-normal flex justify-between dark:text-gray-400">
              <span>만료 날자</span>
              <span>-</span>
            </div>
            <div className="text-text-disabled text-xs font-normal flex justify-between dark:text-gray-400">
              <span>가격</span>
              <span>-</span>
            </div>
            <div className="text-text-disabled text-xs font-normal flex justify-between dark:text-gray-400">
              <span>청구 기간</span>
              <span>-</span>
            </div>
            <div className="text-text-disabled text-xs font-normal flex justify-between dark:text-gray-400">
              <span>청구 갱신</span>
              <span>-</span>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <Button
                className="flex-1 bg-gray-200 text-black dark:text-white dark:bg-gray-700 hover:text-white dark:hover:bg-gray-800"
              >
                <span>결제하기</span>
              </Button>
              <Button
                className="flex-1 bg-gray-200 text-black dark:text-white dark:bg-gray-700 hover:text-white dark:hover:bg-gray-800"
              >
                <span>청구서 조회</span>
              </Button>
            </div>
          </div>
          <div className="px-6 py-4 bg-gradient-to-b from-white to-white dark:from-gray-700 dark:to-gray-600 border border-solid border-background-third dark:border-gray-600 rounded-lg flex flex-col gap-4">
            <div className="w-full">
              <div className="text-xl font-semibold not-italic">
                요금제에 따르는 보석갯수 현황
              </div>
            </div>
            <div className="border-0 border-b border-solid border-border-primary dark:border-gray-600" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled dark:text-gray-400"
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
                <span className="text-xs text-text-disabled dark:text-gray-400">
                  초기에 100개 무료제공
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="check"
                  className="anticon anticon-check text-xs text-text-disabled dark:text-gray-400"
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
                <span className="text-xs text-text-disabled dark:text-gray-400">
                  매일 50개씩 새로제공
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-0 border-b border-solid border-border-primary dark:border-gray-600"></div>
      <UpgradePlan />
    </div>
  );
}
