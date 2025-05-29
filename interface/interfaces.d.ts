// 数据库表结构接口
interface UserProfile {
     id: string;
     first_name: string | null;
     last_name: string | null;
     email: string;
     phone: string | null;
     avatar_url: string | null;
     updated_at: Date;
   }
   