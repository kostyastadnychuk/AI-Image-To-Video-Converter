import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from 'next-auth/jwt';

const env_secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!env_secret) 
    {
        return NextResponse.json({ error: 'Server error: secret not defined' }, { status: 500 });
    }
    
    const token = await getToken({ req, secret: env_secret});

    if (token) 
    {
        /*
        const newConfig = await prisma.config.create({
            data: {
              userid: 2 ,
              m_magic_bullet: body.m_magic_bullet,
              m_aimbot: body.m_aimbot,
              m_aimbot_sniper_mode: body.m_aimbot_sniper_mode,
              m_aimbot_vischeck: body.m_aimbot_vischeck,
              m_aim_index: body.m_aim_index,
              m_aim_bone_index: body.m_aim_bone_index,
              m_sniper_index: body.m_sniper_index,
              m_sniper_smooth: body.m_sniper_smooth,
              m_smooth: body.m_smooth,
              m_hitbox: body.m_hitbox,
              m_fov: body.m_fov,
              m_draw_box: body.m_draw_box,
              m_draw_skel: body.m_draw_skel,
              m_thickness: body.m_thickness,
              m_draw_info: body.m_draw_info,
              m_draw_bomb: body.m_draw_bomb,
              m_draw_fov: body.m_draw_fov,
              m_mode_check: body.m_mode_check,
              m_hit_range: body.m_hit_range,
              m_hit_range_press: body.m_hit_range_press,
              m_hit_range_value: body.m_hit_range_value,
              m_weapon_call: body.m_weapon_call,
              m_weapon_num0_enable: body.m_weapon_num0_enable,
              m_weapon_num1_enable: body.m_weapon_num1_enable,
              m_weapon_num2_enable: body.m_weapon_num2_enable,
              m_weapon_num3_enable: body.m_weapon_num3_enable,
              m_weapon_num4_enable: body.m_weapon_num4_enable,
              m_weapon_num0: body.m_weapon_num0,
              m_weapon_num1: body.m_weapon_num1,
              m_weapon_num2: body.m_weapon_num2,
              m_weapon_num3: body.m_weapon_num3,
              m_weapon_num4: body.m_weapon_num4,
              m_enemy_color: body.m_enemy_color,
              m_bone_vis_color: body.m_bone_vis_color,
            },
          });
         */ 
        // Validate input
        const user_id = Number(token.id);
        const updatedConfig = await prisma.config.update({
            where: { userid: user_id },
            data: {
                m_magic_bullet: body.m_magic_bullet,
                m_aimbot: body.m_aimbot,
                m_aimbot_sniper_mode: body.m_aimbot_sniper_mode,
                m_aimbot_vischeck: body.m_aimbot_vischeck,
                m_aim_index: body.m_aim_index,
                m_aim_bone_index: body.m_aim_bone_index,
                m_sniper_index: body.m_sniper_index,
                m_sniper_smooth: body.m_sniper_smooth,
                m_smooth: body.m_smooth,
                m_hitbox: body.m_hitbox,
                m_fov: body.m_fov,
                m_draw_box: body.m_draw_box,
                m_draw_skel: body.m_draw_skel,
                m_thickness: body.m_thickness,
                m_draw_info: body.m_draw_info,
                m_draw_bomb: body.m_draw_bomb,
                m_draw_fov: body.m_draw_fov,
                m_mode_check: body.m_mode_check,
                m_hit_range: body.m_hit_range,
                m_hit_range_press: body.m_hit_range_press,
                m_hit_range_value: body.m_hit_range_value,
                m_weapon_call: body.m_weapon_call,
                m_weapon_num0_enable: body.m_weapon_num0_enable,
                m_weapon_num1_enable: body.m_weapon_num1_enable,
                m_weapon_num2_enable: body.m_weapon_num2_enable,
                m_weapon_num3_enable: body.m_weapon_num3_enable,
                m_weapon_num4_enable: body.m_weapon_num4_enable,
                m_weapon_num0: body.m_weapon_num0,
                m_weapon_num1: body.m_weapon_num1,
                m_weapon_num2: body.m_weapon_num2,
                m_weapon_num3: body.m_weapon_num3,
                m_weapon_num4: body.m_weapon_num4,
                m_enemy_color: body.m_enemy_color,
                m_bone_vis_color: body.m_bone_vis_color,
            }
          });
      
          if (updatedConfig.count === 0) {
            return NextResponse.json({ error: "Config not found" }, { status: 404 });
          }
      
          return NextResponse.json(updatedConfig, { status: 200 });
    }
    else
    {
        return new NextResponse(
            JSON.stringify({ error: 'Unauthorized: No token provided' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
    }

  } catch (error) {
    console.error("Error creating config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
    try {

    if (!env_secret) 
    {
        return NextResponse.json({ error: 'Server error: secret not defined' }, { status: 500 });
    }
        
    const token = await getToken({ req, secret: env_secret});

    if (token) 
    {
        const user_id = Number(token.id);
        const config = await prisma.config.findUnique({
        where: { userid: user_id },
        });
    
        if (!config) {
        return NextResponse.json({ error: 'Config not found' }, { status: 404 });
        }
    
        return NextResponse.json(config, { status: 200 });
    }
    else
    {
        return new NextResponse(
            JSON.stringify({ error: 'Unauthorized: No token provided' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
    }
      
    } catch (error) {
      console.error('Error fetching config:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }