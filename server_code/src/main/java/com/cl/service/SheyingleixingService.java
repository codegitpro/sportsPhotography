package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.SheyingleixingEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.SheyingleixingView;


/**
 * 摄影类型
 *
 * @author 
 * @email 
 * @date 2026-03-12 19:47:40
 */
public interface SheyingleixingService extends IService<SheyingleixingEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<SheyingleixingView> selectListView(Wrapper<SheyingleixingEntity> wrapper);
   	
   	SheyingleixingView selectView(@Param("ew") Wrapper<SheyingleixingEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<SheyingleixingEntity> wrapper);
   	
   
}

