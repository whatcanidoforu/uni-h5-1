import rjkRequest from "./../axios";
import type {
  IMenu,
  IPermission,
  IRegister,
  IUserAuth,
} from "@/types/permission";

// 发送验证码
export function apiSendCheckCode(data: string) {
  return rjkRequest({
    url: "auth.sendCheckCode",
    data: { data },
  });
}

// 登录
export function apiLogin(params: {
  mobile: string;
  checkCode: string;
  expire?: number | undefined;
}): Promise<IPermission> {
  return rjkRequest({
    url: "auth.loginByCheckCode",
    data: params,
  });
}

// 退出登录
export function apiLogout(data: string) {
  return rjkRequest({
    url: "auth.logout",
    data: { data },
  });
}

// 获取用户权限
export function apiGetUserAuthInfo(data: string): Promise<IUserAuth> {
  return rjkRequest({
    url: "auth.getUserAuthInfo",
    data: { data },
  });
}

// 获取用户权限值列表（用于按钮权限控制）
export function apiGetUserPermission() {
  return rjkRequest<{ code: string }[]>({
    url: "auth.getUserAuthValues",
  });
}

// 注册
export function apiRegister(params: IRegister) {
  return rjkRequest({
    url: "auth.registerUser",
    data: params,
  });
}

// 用户名密码登录
export function apiLoginByLoginName(params: {
  loginName: string;
  password: string;
  expire?: number | undefined;
}) {
  return rjkRequest<IPermission>({
    url: "auth.loginByLoginName",
    data: params,
  });
}

// 根据登录名获取手机号
export function apiGetMobileByLoginName(loginName: string) {
  return rjkRequest<{ data: string | null }>({
    url: "user.getHiddenMobileByLoginName",
    data: { data: loginName },
  });
}

// 变更登录密码
export function apiChangePassword(newPassword: string, oldPassword?: string) {
  return rjkRequest({
    url: "user.updatePasswd",
    data: { newPassword, oldPassword },
  });
}

// 获取菜单配置
export function apiGetMenuConfig() {
  return rjkRequest<IMenu[]>({
    url: "auth.getMenuConfig",
    data: {},
  });
}

// 根据用户名(手机号)获取租户列表
export function apiGetOwnersByUserName(params: {
  userName?: string;
  mobile?: string;
}) {
  return rjkRequest<{ name: string; id: number }[]>({
    url: "owner.getOwnersByUserName",
    data: params,
  });
}
