# RentFind 租房与物业报修平台

```bash
cp .env.example .env
docker compose up -d --build
```

RentFind 面向房东、租客和物业人员，提供房源发布、搜索预约、合同管理和报修跟踪能力。

## 项目主要功能

- 房源发布：小区、户型、面积、租金、押金、付款方式、照片和设施。
- 搜索筛选：区域、价格、户型、面积、设施，并支持列表和地图视图切换。
- 预约看房：租客选择时间段，房东确认后生成通知。
- 合同签订：房东按房源发起合同（租客、租期、租金、押金），租客确认后合同生效，房源转为已签约。
- 退租结算：记录实际退租日，按实际租期重算未结租金与应退押金并生成结算单，房源恢复待出租。
- 物业报修：提交故障类型、描述和照片，物业接单并更新进度。
- 角色区分：房东、租客、物业人员拥有不同工作台。

## 合同与结算接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | /api/contracts/ | 合同列表（含结算单与最新房源状态） |
| POST | /api/contracts/ | 房东发起合同，状态为待确认 |
| GET | /api/contracts/{id}/ | 合同详情 |
| POST | /api/contracts/{id}/confirm/ | 租客确认，合同生效、房源转已签约 |
| POST | /api/contracts/{id}/cancel/ | 取消待确认合同 |
| POST | /api/contracts/{id}/terminate/ | 退租（actualEndDate），生成结算单、房源恢复待出租 |
| GET | /api/contracts/{id}/settlement/ | 查询结算单 |

结算规则：已付租金按原租期全额预付，应付租金按实际租住天数折算（月租金 ÷ 30 × 实际天数）；未结租金优先从押金抵扣，多付租金与抵扣后押金一并退还。合同每次状态变更版本号 +1，刷新后版本、结算与房源状态保持一致。

业务错误统一返回 `{success, code, data, error:{code, message}}`：租期重叠 `CONTRACT_LEASE_OVERLAP`、重复签署 `CONTRACT_DUPLICATE`、日期无效 `CONTRACT_INVALID_DATE`、已终止再操作 `CONTRACT_ALREADY_TERMINATED`、状态不允许 `CONTRACT_STATUS_INVALID`。

## 快速启动方式

首次启动前执行：

```bash
cp .env.example .env
docker compose up -d --build
```

访问地址：http://localhost:18407

## 本地开发方式

```bash
cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python manage.py runserver 0.0.0.0:8000
cd frontend && npm install && npm run dev
```

## 技术栈

| 模块 | 技术 |
| --- | --- |
| 前端 | Vue 3、TypeScript、Element Plus、Vite、高德地图 JS API |
| 后端 | Python、Django、Django REST Framework |
| 数据库 | PostgreSQL |
| 认证 | JWT |
| 部署 | Docker Compose、Nginx |

## 项目目录结构

```text
.
├── backend
│   ├── app
│   ├── database
│   └── manage.py
├── frontend
│   ├── src
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## 环境变量说明

| 变量 | 说明 |
| --- | --- |
| COMPOSE_PROJECT_NAME | Compose 项目名，固定为 rentfind |
| DATABASE_URL | Django 连接 PostgreSQL 的地址 |
| DJANGO_SECRET_KEY | Django 密钥 |
| AMAP_KEY | 高德地图 JS API Key |

## Docker 部署说明

Compose 顶层声明 `name: rentfind`，容器名带 `rentfind-` 前缀，数据库和媒体文件分别使用命名卷持久化，前端 Nginx 将 `/api` 代理到后端 `backend:8000`。

## License

MIT
