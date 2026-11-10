package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.ChathelperEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.ChathelperView;


/**
 * 聊天助手
 *
 * @author 
 * @email 
 * @date 2026-03-12 19:47:42
 */
public interface ChathelperService extends IService<ChathelperEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<ChathelperView> selectListView(Wrapper<ChathelperEntity> wrapper);
   	
   	ChathelperView selectView(@Param("ew") Wrapper<ChathelperEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<ChathelperEntity> wrapper);
   	
   
}

