"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const keySelect = ["Key1", "Key2", "Key3"]; // Example key selection
const boneSelect = ["Bone1", "Bone2", "Bone3"]; // Example bone selection

const App = () => {
  const [cfg, setCfg] = useState({
    m_magic_bullet: false,
    m_aimbot: false,
    m_aimbot_sniper_mode: false,
    m_aimbot_vischeck: false,
    m_aim_index: 0,
    m_aim_bone_index: 0,
    m_sniper_index: 0,
    m_sniper_smooth: 10,
    m_smooth: 10,
    m_hitbox: 20,
    m_fov: 200,
    m_draw_box: false,
    m_draw_skel: false,
    m_thickness: 1.0,
    m_draw_info: false,
    m_draw_bomb: false,
    m_draw_fov: false,
    m_mode_check: false,
    m_hit_range: false,
    m_hit_range_press: false,
    m_hit_range_value: 30,
    m_weapon_call: false,
    m_weapon_num0_enable: false,
    m_weapon_num1_enable: false,
    m_weapon_num2_enable: false,
    m_weapon_num3_enable: false,
    m_weapon_num4_enable: false,
    m_weapon_num0: 0,
    m_weapon_num1: 0,
    m_weapon_num2: 0,
    m_weapon_num3: 0,
    m_weapon_num4: 0,
    m_enemy_color: "#ff0000",
    m_bone_vis_color: "#ff0000",
  });

  const handleCfgChange = (key: string, value: any) => {
    setCfg((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`/api/user/menu`);
        if (!response.ok) {
          throw new Error('Failed to fetch config');
        }
        const data = await response.json();
        setCfg(data);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };

    fetchConfig();
  },[]);

  const handleSave = () => {
    console.log(cfg);
    const fetchChargeHistory = async () => {
      const response = await fetch("/api/user/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cfg)
      });
      
      if(response.ok)
      {
        toast({
          title: "메뉴설정 알림",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">메뉴설정이 성과적으로 진행되었습니다.</code>
            </pre>
          ),
        });
      }
      else
      {
        toast({
          title: "메뉴설정 알림",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">메뉴설정중 오류가 발생하였습니다.</code>
            </pre>
          ),
        });
      }
    };

    fetchChargeHistory();
  };

  return (
    <ScrollArea className="flex grid gap-8 md:grid-cols-1 items-center justify-center h-full overflow-y-auto">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">메뉴설정</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="p-4 border border-solid rounded-lg flex flex-col items-center justify-center text-gray-800 bg-white shadow-md dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
            <Tabs defaultValue="tab1">
              <TabsList className="bg-gray-200 mb-5">
                <TabsTrigger value="tab1">에임봇</TabsTrigger>
                <TabsTrigger value="tab2">ESP</TabsTrigger>
                <TabsTrigger value="tab3">바디샷</TabsTrigger>
                <TabsTrigger value="tab4">인피니티</TabsTrigger>
              </TabsList>

              <TabsContent value="tab1">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_magic_bullet}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_magic_bullet", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        방송용 유도탄
                      </label>
                    </div>
                  </div>

                  {cfg.m_magic_bullet && (
                    <>
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          checked={cfg.m_aimbot_vischeck}
                          onCheckedChange={(checked) =>
                            handleCfgChange("m_aimbot_vischeck", checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                          >
                            벽구분
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          핫키
                        </label>
                        <Select
                          value={cfg.m_aim_index.toString()} // value를 문자열로 변환
                          onValueChange={(value) =>
                            handleCfgChange("m_aim_index", parseInt(value))
                          } // 선택된 값을 숫자로 변환하여 상태 업데이트
                        >
                          <SelectTrigger className="w-[250px] dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <SelectValue placeholder="핫키를 선택하세요" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                            <SelectGroup>
                              <SelectLabel className="dark:text-gray-400">
                                핫키
                              </SelectLabel>
                              <SelectItem
                                value="0"
                                className="dark:hover:bg-gray-700"
                              >
                                Left
                              </SelectItem>
                              <SelectItem
                                value="1"
                                className="dark:hover:bg-gray-700"
                              >
                                Right
                              </SelectItem>
                              <SelectItem
                                value="2"
                                className="dark:hover:bg-gray-700"
                              >
                                Middle
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          타격 부위
                        </label>
                        <Select
                          value={cfg.m_aim_bone_index.toString()} // value를 문자열로 변환
                          onValueChange={(value) =>
                            handleCfgChange("m_aim_bone_index", parseInt(value))
                          } // 선택된 값을 숫자로 변환하여 상태 업데이트
                        >
                          <SelectTrigger className="w-[250px] dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <SelectValue placeholder="타격 부위를 선택하세요" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                            <SelectGroup>
                              <SelectLabel className="dark:text-gray-400">
                                타격 부위
                              </SelectLabel>
                              <SelectItem
                                value="0"
                                className="dark:hover:bg-gray-700"
                              >
                                Head
                              </SelectItem>
                              <SelectItem
                                value="1"
                                className="dark:hover:bg-gray-700"
                              >
                                Neck
                              </SelectItem>
                              <SelectItem
                                value="2"
                                className="dark:hover:bg-gray-700"
                              >
                                Body
                              </SelectItem>
                              <SelectItem
                                value="3"
                                className="dark:hover:bg-gray-700"
                              >
                                Closet
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          포브
                        </label>
                        <Slider
                          defaultValue={[cfg.m_fov]} // value를 배열로 전달
                          className="w-[250px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          min={0}
                          max={500}
                          step={1}
                          onChange={(value) => handleCfgChange("m_fov", value)} // value의 첫 번째 요소를 사용
                        />
                      </div>
                    </>
                  )}

                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_aimbot}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_aimbot", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        에임봇
                      </label>
                    </div>
                  </div>
                  {cfg.m_aimbot && (
                    <>
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          checked={cfg.m_aimbot_sniper_mode}
                          onCheckedChange={(checked) =>
                            handleCfgChange("m_aimbot_sniper_mode", checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                          >
                            패줌 모드
                          </label>
                        </div>
                      </div>
                      {cfg.m_aimbot_sniper_mode && (
                        <div className="flex justify-between items-center space-x-2">
                          <label className="text-sm font-medium dark:text-gray-100">
                            패줌 감도
                          </label>
                          <Slider
                            defaultValue={[cfg.m_sniper_smooth]} // value를 배열로 전달
                            min={0}
                            max={100}
                            step={1}
                            className="w-[250px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                            onChange={(value) =>
                              handleCfgChange("m_sniper_smooth", value)
                            } // value의 첫 번째 요소를 사용
                          />
                        </div>
                      )}
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          checked={cfg.m_aimbot_vischeck}
                          onCheckedChange={(checked) =>
                            handleCfgChange("m_aimbot_vischeck", checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                          >
                            벽구분
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          핫키
                        </label>
                        <Select
                          value={cfg.m_aim_index.toString()} // value를 문자열로 변환
                          onValueChange={(value) =>
                            handleCfgChange("m_aim_index", parseInt(value))
                          } // 선택된 값을 숫자로 변환하여 상태 업데이트
                        >
                          <SelectTrigger className="w-[250px] dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <SelectValue placeholder="핫키를 선택하세요" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                            <SelectGroup>
                              <SelectLabel className="dark:text-gray-400">
                                핫키
                              </SelectLabel>
                              <SelectItem
                                value="0"
                                className="dark:hover:bg-gray-700"
                              >
                                Left
                              </SelectItem>
                              <SelectItem
                                value="1"
                                className="dark:hover:bg-gray-700"
                              >
                                Right
                              </SelectItem>
                              <SelectItem
                                value="2"
                                className="dark:hover:bg-gray-700"
                              >
                                Middle
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          패줌 핫키
                        </label>
                        <Select
                          value={cfg.m_sniper_index.toString()} // value를 문자열로 변환
                          onValueChange={(value) =>
                            handleCfgChange("m_sniper_index", parseInt(value))
                          } // 선택된 값을 숫자로 변환하여 상태 업데이트
                        >
                          <SelectTrigger className="w-[250px] dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <SelectValue placeholder="패줌 핫키 선택하세요" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                            <SelectGroup>
                              <SelectLabel className="dark:text-gray-400">
                                패줌 핫키
                              </SelectLabel>
                              <SelectItem
                                value="0"
                                className="dark:hover:bg-gray-700"
                              >
                                Side1
                              </SelectItem>
                              <SelectItem
                                value="1"
                                className="dark:hover:bg-gray-700"
                              >
                                Side2
                              </SelectItem>
                              <SelectItem
                                value="2"
                                className="dark:hover:bg-gray-700"
                              >
                                Middle
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          타격 부위
                        </label>
                        <Select
                          value={cfg.m_aim_bone_index.toString()} // value를 문자열로 변환
                          onValueChange={(value) =>
                            handleCfgChange("m_aim_bone_index", parseInt(value))
                          } // 선택된 값을 숫자로 변환하여 상태 업데이트
                        >
                          <SelectTrigger className="w-[250px] dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <SelectValue placeholder="타격 부위를 선택하세요" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                            <SelectGroup>
                              <SelectLabel className="dark:text-gray-400">
                                타격 부위
                              </SelectLabel>
                              <SelectItem
                                value="0"
                                className="dark:hover:bg-gray-700"
                              >
                                Head
                              </SelectItem>
                              <SelectItem
                                value="1"
                                className="dark:hover:bg-gray-700"
                              >
                                Neck
                              </SelectItem>
                              <SelectItem
                                value="2"
                                className="dark:hover:bg-gray-700"
                              >
                                Body
                              </SelectItem>
                              <SelectItem
                                value="3"
                                className="dark:hover:bg-gray-700"
                              >
                                Closet
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          감도
                        </label>
                        <Slider
                          defaultValue={[cfg.m_smooth]} // value를 배열로 전달
                          min={0}
                          max={100}
                          step={1}
                          className="w-[250px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          onChange={(value) =>
                            handleCfgChange("m_smooth", value)
                          } // value의 첫 번째 요소를 사용
                        />
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          오토샷 범위
                        </label>
                        <Slider
                          defaultValue={[cfg.m_hitbox]} // value를 배열로 전달
                          min={0}
                          max={20}
                          step={1}
                          className="w-[250px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          onChange={(value) =>
                            handleCfgChange("m_hitbox", value)
                          } // value의 첫 번째 요소를 사용
                        />
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          포브
                        </label>
                        <Slider
                          defaultValue={[cfg.m_fov]} // value를 배열로 전달
                          min={0}
                          max={300}
                          step={1}
                          className="w-[250px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          onChange={(value) => handleCfgChange("m_fov", value)} // value의 첫 번째 요소를 사용
                        />
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tab2">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_draw_box}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_draw_box", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        3D 박스
                      </label>
                    </div>
                  </div>

                  {cfg.m_draw_box && (
                    <div className="flex justify-between items-center space-x-2">
                      <label className="text-sm font-medium dark:text-gray-100">
                        3D 박스 색상
                      </label>
                      <Input
                        type="color"
                        value={cfg.m_enemy_color}
                        className="w-[250px] dark:bg-gray-800 dark:text-gray-100"
                        onChange={(e) =>
                          handleCfgChange("m_enemy_color", e.target.value)
                        }
                      />
                    </div>
                  )}
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_draw_skel}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_draw_skel", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        스켈레톤
                      </label>
                    </div>
                  </div>
                  {cfg.m_draw_skel && (
                    <>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          두께
                        </label>
                        <Slider
                          defaultValue={[cfg.m_thickness]} // value를 배열로 전달
                          min={0.5}
                          max={2}
                          step={0.1}
                          className="w-[250px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          onChange={(value) =>
                            handleCfgChange("m_thickness", value)
                          } // value의 첫 번째 요소를 사용
                        />
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          스켈레톤 색상
                        </label>
                        <Input
                          type="color"
                          value={cfg.m_bone_vis_color}
                          className="w-[250px] dark:bg-gray-800 dark:text-gray-100"
                          onChange={(e) =>
                            handleCfgChange("m_bone_vis_color", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_draw_info}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_draw_info", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        체력 / 방어
                      </label>
                    </div>
                  </div>
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_draw_bomb}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_draw_bomb", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        수류탄 / C4
                      </label>
                    </div>
                  </div>
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_draw_fov}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_draw_fov", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        포브 그리기
                      </label>
                    </div>
                  </div>
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_mode_check}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_mode_check", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        적 / 전체
                      </label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tab3">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_hit_range}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_hit_range", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        바디샷
                      </label>
                    </div>
                  </div>

                  {cfg.m_hit_range && (
                    <>
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          checked={cfg.m_hit_range_press}
                          onCheckedChange={(checked) =>
                            handleCfgChange("m_hit_range_press", checked)
                          }
                        />
                        <label className="text-sm font-medium dark:text-gray-100">
                          핫키 / 고정
                        </label>
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium dark:text-gray-100">
                          바디샷 범위
                        </label>
                        <Slider
                          defaultValue={[cfg.m_hit_range_value]} // value를 배열로 전달
                          className="w-[250px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          min={0}
                          max={100}
                          step={1}
                          onChange={(value) =>
                            handleCfgChange("m_hit_range_value", value)
                          } // value의 첫 번째 요소를 사용
                        />
                      </div>

                      {cfg.m_hit_range_press && (
                        <div className="flex justify-between items-center space-x-2">
                          <label className="text-sm font-medium dark:text-gray-100">
                            바디샷 핫키
                          </label>
                          <Select
                            value={cfg.m_aim_index.toString()} // value를 문자열로 변환
                            onValueChange={(value) =>
                              handleCfgChange("m_aim_index", parseInt(value))
                            } // 선택된 값을 숫자로 변환하여 상태 업데이트
                          >
                            <SelectTrigger className="w-[250px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                              <SelectValue placeholder="바디샷 핫키를 선택하세요" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel className="dark:text-gray-100">
                                  바디샷 핫키
                                </SelectLabel>
                                <SelectItem
                                  value="0"
                                  className="dark:bg-gray-800 dark:text-gray-100"
                                >
                                  Left
                                </SelectItem>
                                <SelectItem
                                  value="1"
                                  className="dark:bg-gray-800 dark:text-gray-100"
                                >
                                  Right
                                </SelectItem>
                                <SelectItem
                                  value="2"
                                  className="dark:bg-gray-800 dark:text-gray-100"
                                >
                                  Middle
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tab4">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={cfg.m_weapon_call}
                      onCheckedChange={(checked) =>
                        handleCfgChange("m_weapon_call", checked)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                      >
                        인피니티
                      </label>
                    </div>
                  </div>

                  {cfg.m_weapon_call && (
                    <>
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          checked={cfg.m_weapon_num0_enable}
                          onCheckedChange={(checked) =>
                            handleCfgChange("m_weapon_num0_enable", checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                          >
                            주무기
                          </label>
                        </div>
                      </div>

                      {cfg.m_weapon_num0_enable && (
                        <Input
                          value={cfg.m_weapon_num0}
                          onChange={(e) =>
                            handleCfgChange("m_weapon_num0", +e.target.value)
                          }
                          className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        />
                      )}
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          checked={cfg.m_weapon_num1_enable}
                          onCheckedChange={(checked) =>
                            handleCfgChange("m_weapon_num1_enable", checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                          >
                            보조무기
                          </label>
                        </div>
                      </div>

                      {cfg.m_weapon_num1_enable && (
                        <Input
                          value={cfg.m_weapon_num1}
                          onChange={(e) =>
                            handleCfgChange("m_weapon_num1", +e.target.value)
                          }
                          className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        />
                      )}
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          checked={cfg.m_weapon_num2_enable}
                          onCheckedChange={(checked) =>
                            handleCfgChange("m_weapon_num2_enable", checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                          >
                            근접무기
                          </label>
                        </div>
                      </div>

                      {cfg.m_weapon_num2_enable && (
                        <Input
                          value={cfg.m_weapon_num2}
                          onChange={(e) =>
                            handleCfgChange("m_weapon_num2", +e.target.value)
                          }
                          className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        />
                      )}
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          checked={cfg.m_weapon_num3_enable}
                          onCheckedChange={(checked) =>
                            handleCfgChange("m_weapon_num3_enable", checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                          >
                            투척무기
                          </label>
                        </div>
                      </div>

                      {cfg.m_weapon_num3_enable && (
                        <Input
                          value={cfg.m_weapon_num3}
                          onChange={(e) =>
                            handleCfgChange("m_weapon_num3", +e.target.value)
                          }
                          className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        />
                      )}
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          checked={cfg.m_weapon_num4_enable}
                          onCheckedChange={(checked) =>
                            handleCfgChange("m_weapon_num4_enable", checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                          >
                            설치무기
                          </label>
                        </div>
                      </div>

                      {cfg.m_weapon_num4_enable && (
                        <Input
                          value={cfg.m_weapon_num4}
                          onChange={(e) =>
                            handleCfgChange("m_weapon_num4", +e.target.value)
                          }
                          className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        />
                      )}
                    </>
                  )}
                </div>
              </TabsContent>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
                className="mt-10"
              >
                <Button onClick={() => handleSave()} className="bg-blue-500 text-white dark:bg-gray-700 dark:text-white px-4 py-2 rounded hover:bg-blue-800 dark:hover:bg-gray-500">저장하기</Button>
              </div>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default App;
