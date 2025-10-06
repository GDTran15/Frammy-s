//package com.backend.frammy.mapper;
//
//import com.backend.frammy.dto.UserLogDTO;
//import com.backend.frammy.model.UserLog;
//
//public class LogToDTO {
//
//    public static UserLogDTO toDTO(UserLog log) {
//        if (log == null) return null;
//
//        return new UserLogDTO(
//                log.getAction(),
//                log.getTarget(),
//                log.getDetails(),
//                log.getTimestamp()
//        );
//    }
//
//    public static UserLog toEntity(UserLogDTO dto) {
//        if (dto == null) return null;
//
//        UserLog log = new UserLog();
//        log.setAction(dto.getAction());
//        log.setTarget(dto.getTarget());
//        log.setDetails(dto.getDetails());
//        log.setTimestamp(dto.getTimestamp());
//        return log;
//    }
//}
