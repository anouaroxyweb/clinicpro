# ClinicPro

نظام إدارة العيادات الطبية مبني بتقنية **Laravel (API)** و **React.js (Admin Panel)** لتسهيل تسيير العيادة بشكل احترافي ومرن.

يتيح النظام إدارة:
- المرضى
- الأطباء
- المواعيد
- الملفات الطبية
- لوحة تحكم تفاعلية

---

## واجهة النظام

![Dashboard Preview](./public/dashboard-preview.png)

---

## الخصائص الرئيسية (Features)

- إدارة المرضى (إضافة، تعديل، حذف)
- إدارة الأطباء والتخصصات
- حجز المواعيد وجدولتها
- صفحة تسجيل الدخول مع أدوار وصلاحيات
- لوحة تحكم تفاعلية وسهلة الاستخدام
- API مبني بـ Laravel قابل للدمج مع أي واجهة

---

## **التقنيات المستعملة (Tech Stack)**

**Backend (API):**
- Laravel 11
- MySQL
- Sanctum (Token Authentication)

**Frontend (Admin Panel):**
- React.js
- React Router
- Axios
- Tailwind CSS

---

## **تنصيب المشروع (Installation)**

### 1. Backend (Laravel API)

```bash
cd clinic-api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve


```md
# ClinicPro Admin Panel (React)

لوحة التحكم الخاصة بنظام إدارة العيادات، مبنية بتقنية **React.js** و **Tailwind CSS**.  
تتصل مباشرة مع API مبني بـ Laravel.

---

## واجهة النظام

![Dashboard Preview](./public/dashboard-preview.png)

---

## المتطلبات (Prerequisites)
- Node.js
- npm

---

## التثبيت (Installation)

```bash
cd clinic-admin-react
npm install
