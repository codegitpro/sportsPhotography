package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.SheyingyuyueEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.SheyingyuyueView;


/**
 * 摄影预约
 *
 * @author 
 * @email 
 * @date 2026-03-12 19:47:40
 */
public interface SheyingyuyueService extends IService<SheyingyuyueEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<SheyingyuyueView> selectListView(Wrapper<SheyingyuyueEntity> wrapper);
   	
   	SheyingyuyueView selectView(@Param("ew") Wrapper<SheyingyuyueEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<SheyingyuyueEntity> wrapper);
   	
   
    List<Map<String, Object>> selectValue(Map<String, Object> params,Wrapper<SheyingyuyueEntity> wrapper);

    List<Map<String, Object>> selectTimeStatValue(Map<String, Object> params,Wrapper<SheyingyuyueEntity> wrapper);

    List<Map<String, Object>> selectGroup(Map<String, Object> params,Wrapper<SheyingyuyueEntity> wrapper);



}

