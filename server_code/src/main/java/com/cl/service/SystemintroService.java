package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.SystemintroEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.SystemintroView;


/**
 * 网站介绍
 *
 * @author 
 * @email 
 * @date 2026-03-12 19:47:39
 */
public interface SystemintroService extends IService<SystemintroEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<SystemintroView> selectListView(Wrapper<SystemintroEntity> wrapper);
   	
   	SystemintroView selectView(@Param("ew") Wrapper<SystemintroEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<SystemintroEntity> wrapper);
   	
   
}

