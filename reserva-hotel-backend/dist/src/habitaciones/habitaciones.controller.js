"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitacionesController = void 0;
const common_1 = require("@nestjs/common");
const create_habitacion_dto_1 = require("./dto/create-habitacion.dto");
const habitaciones_service_1 = require("./habitaciones.service");
let HabitacionesController = class HabitacionesController {
    habitacionesService;
    constructor(habitacionesService) {
        this.habitacionesService = habitacionesService;
    }
    findAll() {
        return this.habitacionesService.findAll();
    }
    create(dto) {
        return this.habitacionesService.create(dto);
    }
};
exports.HabitacionesController = HabitacionesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HabitacionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_habitacion_dto_1.CreateHabitacionDto]),
    __metadata("design:returntype", Promise)
], HabitacionesController.prototype, "create", null);
exports.HabitacionesController = HabitacionesController = __decorate([
    (0, common_1.Controller)('habitaciones'),
    __metadata("design:paramtypes", [habitaciones_service_1.HabitacionesService])
], HabitacionesController);
//# sourceMappingURL=habitaciones.controller.js.map