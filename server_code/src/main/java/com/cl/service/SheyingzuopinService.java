package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.SheyingzuopinEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.SheyingzuopinView;


/**
 * 摄影作品
 *
 * @author 
 * @email 
 * @date 2026-03-12 19:47:39
 */
public interface SheyingzuopinService extends IService<SheyingzuopinEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<SheyingzuopinView> selectListView(Wrapper<SheyingzuopinEntity> wrapper);
   	
   	SheyingzuopinView selectView(@Param("ew") Wrapper<SheyingzuopinEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<SheyingzuopinEntity> wrapper);
   	
   
    List<Map<String, Object>> selectValue(Map<String, Object> params,Wrapper<SheyingzuopinEntity> wrapper);

    List<Map<String, Object>> selectTimeStatValue(Map<String, Object> params,Wrapper<SheyingzuopinEntity> wrapper);

    List<Map<String, Object>> selectGroup(Map<String, Object> params,Wrapper<SheyingzuopinEntity> wrapper);



}

